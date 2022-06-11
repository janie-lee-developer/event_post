import React, { useEffect, useState } from "react";
import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import { searchKeyword } from "../../store/events";

//MUI
import { Box, TextField, Button, Alert } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SearchEngine = ({ explore }) => {
  const dispatch = useDispatch();
  let location = {};

  // For search bar
  const [searchObj, setSearchObj] = useState({ name: "", location: location.city ? location.city : "New York", date: new Date() });

  // For geolocation of user
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocation();
    window.scrollTo(0, 0);
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setError(null);
          location["latitude"] = position.coords.latitude;
          location["longitude"] = position.coords.longitude;

          const data = (
            await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`
            )
          ).data;

          setSearchObj({ ...searchObj, location: data.city });
          location["city"] = data.city;
          window.localStorage.setItem("userLocation", JSON.stringify(location));
        },
        () => {
          window.localStorage.removeItem("userLocation");
          setError("Unable to retrieve your location.");
        }
      );
    }
  };

  // For searchbar
  const handleChange = async (e) => {
    setSearchObj({ ...searchObj, [e.target.name]: e.target.value });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(searchKeyword(searchObj));
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        id="filled-basic"
        label="Search events"
        variant="filled"
        name="name"
        type="search"
        color="pink"
        value={searchObj.name}
        onChange={handleChange}
        onKeyDown={handleEnter}
        sx={{
          width: explore
            ? "80%"
            : {
                xxs: "235px",
                xs: "80%",
                sm: "450px",
              },
          borderRadius: "20px",
          input: {
            background: "#ebeced",
          },
        }}
      />
      <br style={{ marginTop: "1vw" }} />
      <TextField
        onChange={(e) => {
          handleChange(e);
        }}
        id="filled-basic"
        label={
          <Box>
            <LocationOnIcon /> Location
          </Box>
        }
        onKeyDown={handleEnter}
        variant="filled"
        name="location"
        type="location"
        color="pink"
        value={searchObj.location}
        sx={{
          marginTop: "1vw",
          width: explore
            ? "80%"
            : {
                xxs: "235px",
                xs: "80%",
                sm: "450px",
              },
          input: {
            background: "#ebeced",
          },
        }}
      />
      {error !== null ? (
        <Alert
          severity="warning"
          sx={{
            width: explore
              ? "80%"
              : {
                  xxs: "235px",
                  xs: "80%",
                  sm: "450px",
                },
            margin: "0 auto",
            backgroundColor: "transparent",
          }}
        >
          {error}
        </Alert>
      ) : (
        <></>
      )}
      {error !== null ? <></> : <br />}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={searchObj.date}
          onChange={(newDate) => {
            setSearchObj({ ...searchObj, date: newDate });
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                id="filled-basic"
                label="Date"
                variant="filled"
                color="pink"
                sx={{
                  width: explore
                    ? "80%"
                    : {
                        xxs: "235px",
                        xs: "80%",
                        sm: "450px",
                      },
                  marginTop: "1vw",
                  backgroundColor: "#ebeced",
                  input: {
                    background: "#ebeced",
                  },
                }}
              />
            );
          }}
        />
      </LocalizationProvider>
      <br />
      <Button
        color="pink"
        variant="contained"
        sx={{
          width: "150px",
          marginTop: {
            xxs: "3vw",
            xs: "3vw",
            sm: "1vw",
          },
          borderRadius: "3rem",
          fontSize: "20px",
        }}
        onClick={() => {
          dispatch(searchKeyword(searchObj));
        }}
      >
        Go
      </Button>
    </Box>
  );
};

export default SearchEngine;