# APEX IG Freeze Columns

This project provides a simple approach to freeze the first N columns in an Oracle APEX Interactive Grid using a dynamic page item. It enhances usability by allowing users to keep important columns visible while scrolling horizontally, similar to the freeze panes feature in spreadsheet applications.

---

## Overview

The solution uses a Select List page item to control how many columns should be frozen. Based on the selected value, JavaScript dynamically applies styling to the Interactive Grid, ensuring that the selected columns remain fixed during horizontal scrolling.

The implementation does not require any plugins and works entirely with native Oracle APEX capabilities and JavaScript.

---

## Features

* Freeze any number of columns dynamically
* Works seamlessly with pagination, sorting, and filtering
* Automatically adjusts to column widths without manual configuration
* Lightweight and easy to integrate into existing applications
* No dependency on external plugins

---

## Setup Instructions

### Page Item Configuration

Create a Select List page item named P1_FREEZE_COLS. Configure it with static values representing the number of columns to freeze, such as 0 through 5. Set the default value to 0 so that no columns are frozen initially.

---

### Interactive Grid Configuration

Assign a Static ID to the Interactive Grid region. This Static ID is used by the JavaScript to identify and apply the freeze functionality to the correct grid.

---

### JavaScript Integration

Add the required JavaScript to the page under the "Execute when Page Loads" section. This script handles the freezing logic, including clearing previous styles, calculating column widths, and applying sticky positioning.

The script also ensures that the freeze effect is reapplied automatically after grid refresh events such as pagination, sorting, and filtering.

---

### Dynamic Action

Create a Dynamic Action on the P1_FREEZE_COLS page item with a Change event. This Dynamic Action should trigger the JavaScript function responsible for applying the freeze logic whenever the user selects a new value.

---

### Optional Styling

Additional CSS can be added to maintain consistent styling, such as zebra striping for rows and proper layering of frozen headers during scrolling.

---

## How It Works

The solution reads the selected value from the page item and determines how many columns need to be frozen. It then calculates the width of each column dynamically from the grid and applies sticky positioning with the appropriate horizontal offset.

This ensures that the frozen columns remain aligned and visually consistent regardless of screen size or column content.

To maintain consistency, the logic is automatically triggered after any grid refresh event, ensuring that the frozen columns persist across user interactions.

---

## Use Cases

* Reports with key identifier columns that must remain visible
* Financial and operational dashboards
* Data-heavy grids requiring better horizontal navigation
* Applications that aim to provide an Excel-like user experience

---

## Future Enhancements

* Support for freezing header rows
* Option to store user preferences
* Improved user interface controls for toggling freeze behavior
* Conversion into a reusable APEX plugin
