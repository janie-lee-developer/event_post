import React, { useState, useEffect } from "react";

// router
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "../../store/error";

// child component
import SearchEngine from "../helperComponents/SearchEngine";

//MUI
import {
  Box,
  Grid,
  Paper,
  Button,
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const SearchBar = ({ filterCategory, windowDimensions, match, filter }) => {
  const dispatch = useDispatch();
  const { width, height } = windowDimensions;

  const [open, setOpen] = useState(width <= 930 ? false : true);
  const [categoryOpen, setCategoryOpen] = useState(width <= 930 ? false : true);
  const [sortClickOpen, setSortClickOpen] = useState(width <= 930 ? false : true);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (!filter.category) setCategory("");
    if (!filter.sort) setSort("");
  }, [filter]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCategoryClick = () => {
    setCategoryOpen(!categoryOpen);
  };

  const handleSortClick = () => {
    setSortClickOpen(!sortClickOpen);
  };

  const handleCategory = (e) => {
    if (e.target.value === category) {
      setCategory("");
      filterCategory("category_null");
    } else {
      setCategory(e.target.value);
      filterCategory(e.target.value);
    }
  };

  const handleSort = (e) => {
    if (e.target.value === sort) {
      setSort("");
      filterCategory("price_null");
    } else {
      setSort(e.target.value);
      filterCategory(e.target.value);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xxs: "80%",
          md: "auto",
        },
        overflow: {
          xxs: "scroll",
          md: "visible",
        },
      }}
    >
      <List
        sx={{ width: "100%", bgcolor: "#f2f2f2", display: { xxs: "none", md: "block" } }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemText sx={{ padding: "8px 16px" }}>
          <Typography
            variant="promptTitle"
            color="#d83f87"
            sx={{ fontSize: "1rem", fontWeight: "300" }}
          >
            Filter
          </Typography>
        </ListItemText>
        <Box
          sx={{
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <SearchEngine explore={true} match={match} />
        </Box>
        <ListItemButton onClick={handleCategoryClick}>
          <Typography
            variant="promptTitle"
            color="#d83f87"
            sx={{ fontSize: "1rem", fontWeight: "300" }}
          >
            Categories
          </Typography>
          {categoryOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Box sx={{ paddingLeft: "30px" }}>
              <FormControl>
                <RadioGroup name="controlled-radio-buttons-group" value={category}>
                  <FormControlLabel
                    value="Sports"
                    control={
                      <Radio
                        onClick={(e) => {
                          handleCategory(e);
                          dispatch(removeError());
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#d83f87",
                          },
                        }}
                      />
                    }
                    label="Sports"
                  />
                  <FormControlLabel
                    value="Music"
                    control={
                      <Radio
                        onClick={(e) => {
                          handleCategory(e);
                          dispatch(removeError());
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#d83f87",
                          },
                        }}
                      />
                    }
                    label="Music"
                  />
                  <FormControlLabel
                    value="Film"
                    control={
                      <Radio
                        onClick={(e) => {
                          handleCategory(e);
                          dispatch(removeError());
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#d83f87",
                          },
                        }}
                      />
                    }
                    label="Film"
                  />
                  <FormControlLabel
                    value="Arts & Theatre"
                    control={
                      <Radio
                        onClick={(e) => {
                          handleCategory(e);
                          dispatch(removeError());
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#d83f87",
                          },
                        }}
                      />
                    }
                    label="Arts & Theatre"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </List>
        </Collapse>
        <ListItemButton onClick={handleSortClick}>
          <Typography
            variant="promptTitle"
            color="#d83f87"
            sx={{ fontSize: "1rem", fontWeight: "300" }}
          >
            Sort by
          </Typography>
          {sortClickOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={sortClickOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Box sx={{ paddingLeft: "30px" }}>
              <FormControl>
                <RadioGroup name="controlled-radio-buttons-group" value={sort}>
                  <FormControlLabel
                    value="price_low"
                    control={
                      <Radio
                        onClick={(e) => {
                          handleSort(e);
                          dispatch(removeError());
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#d83f87",
                          },
                        }}
                      />
                    }
                    label="Price low to high"
                  />
                  <FormControlLabel
                    value="price_high"
                    control={
                      <Radio
                        onClick={(e) => {
                          handleSort(e);
                          dispatch(removeError());
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#d83f87",
                          },
                        }}
                      />
                    }
                    label="Price high to low"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </List>
        </Collapse>
      </List>
      <List
        sx={{ width: "100%", bgcolor: "#f2f2f2", display: { xxs: "block", md: "none" } }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Filter" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Box
              sx={{
                textAlign: "center",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <SearchEngine explore={true} match={match} />
            </Box>
            <ListItemButton onClick={handleCategoryClick}>
              <Typography
                variant="promptTitle"
                color="#d83f87"
                sx={{ fontSize: "1rem", fontWeight: "300" }}
              >
                Categories
              </Typography>
              {categoryOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Box sx={{ paddingLeft: "30px" }}>
                  <FormControl>
                    <RadioGroup name="controlled-radio-buttons-group" value={category}>
                      <FormControlLabel
                        value="Sports"
                        control={
                          <Radio
                            onClick={(e) => {
                              handleCategory(e);
                              dispatch(removeError());
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#d83f87",
                              },
                            }}
                          />
                        }
                        label="Sports"
                      />
                      <FormControlLabel
                        value="Music"
                        control={
                          <Radio
                            onClick={(e) => {
                              handleCategory(e);
                              dispatch(removeError());
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#d83f87",
                              },
                            }}
                          />
                        }
                        label="Music"
                      />
                      <FormControlLabel
                        value="Film"
                        control={
                          <Radio
                            onClick={(e) => {
                              handleCategory(e);
                              dispatch(removeError());
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#d83f87",
                              },
                            }}
                          />
                        }
                        label="Film"
                      />
                      <FormControlLabel
                        value="Arts & Theatre"
                        control={
                          <Radio
                            onClick={(e) => {
                              handleCategory(e);
                              dispatch(removeError());
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#d83f87",
                              },
                            }}
                          />
                        }
                        label="Arts & Theatre"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </List>
            </Collapse>
            <ListItemButton onClick={handleSortClick}>
              <Typography
                variant="promptTitle"
                color="#d83f87"
                sx={{ fontSize: "1rem", fontWeight: "300" }}
              >
                Sort by
              </Typography>
              {sortClickOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={sortClickOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Box sx={{ paddingLeft: "30px" }}>
                  <FormControl>
                    <RadioGroup name="controlled-radio-buttons-group" value={sort}>
                      <FormControlLabel
                        value="price_low"
                        control={
                          <Radio
                            onClick={(e) => {
                              handleSort(e);
                              dispatch(removeError());
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#d83f87",
                              },
                            }}
                          />
                        }
                        label="Price low to high"
                      />
                      <FormControlLabel
                        value="price_high"
                        control={
                          <Radio
                            onClick={(e) => {
                              handleSort(e);
                              dispatch(removeError());
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#d83f87",
                              },
                            }}
                          />
                        }
                        label="Price high to low"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </List>
            </Collapse>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default SearchBar;
