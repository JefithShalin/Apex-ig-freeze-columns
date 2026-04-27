/**
 * ============================================================
 *  Module        : APEX IG Freeze Columns
 *  Description   : Freeze first N columns in an Interactive Grid
 *                  using a page item (P1_FREEZE_COLS)
 * ============================================================
 */

(function (window, apex, $) {
  "use strict";

  /* ------------------------------------------------------------
   * Configuration
   * ------------------------------------------------------------ */
  const REGION_ID = "emp_grid";        // Static ID of IG region
  const ITEM_NAME = "P1_FREEZE_COLS";  // Page item controlling freeze count

  /* ------------------------------------------------------------
   * Utility: Get Interactive Grid Table
   * ------------------------------------------------------------ */
  function getGridTable() {
    const region = apex.region(REGION_ID);
    return region ? region.widget().find(".a-GV-table") : $();
  }

  /* ------------------------------------------------------------
   * Clear Existing Freeze Styles
   * ------------------------------------------------------------ */
  function clearFreeze() {
    const $table = getGridTable();

    if (!$table.length) return;

    $table
      .find("thead th, tbody td")
      .css({
        position: "",
        left: "",
        zIndex: "",
        background: "",
        boxShadow: "",
        borderRight: ""
      })
      .removeClass("ig-frozen-col ig-freeze-edge");
  }

  /* ------------------------------------------------------------
   * Apply Freeze Logic
   * ------------------------------------------------------------ */
  function applyFreeze(columnCount) {
    clearFreeze();

    const numCols = parseInt(columnCount, 10);
    if (!numCols || numCols < 1) return;

    const $table = getGridTable();
    if (!$table.length) return;

    /* Get column widths dynamically */
    const columnWidths = [];
    $table.find("thead tr:first-child th").each(function (index) {
      columnWidths[index] = $(this).outerWidth() || 120;
    });

    /* Apply sticky positioning */
    $table.find("thead tr, tbody tr").each(function () {
      const $row = $(this);
      const isHeader = $row.closest("thead").length > 0;

      let leftOffset = 0;

      $row.children("th, td").each(function (colIndex) {
        if (colIndex >= numCols) return false;

        const $cell = $(this);
        const isEdgeColumn = colIndex === numCols - 1;

        $cell.css({
          position: "sticky",
          left: leftOffset + "px",
          zIndex: isHeader ? 31 : 20,
          background: isHeader ? "#1a5f9e" : "#e8f0fa",
          boxShadow: isEdgeColumn ? "2px 0 0 0 #0572ce" : ""
        });

        leftOffset += columnWidths[colIndex];
      });
    });

    /* Ensure horizontal scrolling */
    apex.region(REGION_ID)
      .widget()
      .find(".a-GV-w-scrollX")
      .css("overflow-x", "auto");
  }

  /* ------------------------------------------------------------
   * Read Page Item and Apply Freeze
   * ------------------------------------------------------------ */
  function applyFromItem() {
    const value = $v(ITEM_NAME) || "0";
    applyFreeze(value);
  }

  /* ------------------------------------------------------------
   * Event Binding (Refresh / Pagination / Sort)
   * ------------------------------------------------------------ */
  $(document).on(
    "gridviewcreate apexafterrefresh",
    "#" + REGION_ID,
    function () {
      setTimeout(applyFromItem, 200);
    }
  );

  /* ------------------------------------------------------------
   * Initial Load
   * ------------------------------------------------------------ */
  setTimeout(applyFromItem, 800);

  /* ------------------------------------------------------------
   * Expose Public API
   * ------------------------------------------------------------ */
  window.apexIgFreezeColumns = applyFromItem;

})(window, apex, apex.jQuery);
