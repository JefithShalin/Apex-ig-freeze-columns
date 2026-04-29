(function (window, apex, $) {
  "use strict";

  const REGION_ID = "emp_grid";        
  const ITEM_NAME = "P1_FREEZE_COLS";  

  function getGridTable() {
    const region = apex.region(REGION_ID);
    return region ? region.widget().find(".a-GV-table") : $();
  }

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

  function applyFreeze(columnCount) {
    clearFreeze();

    const numCols = parseInt(columnCount, 10);
    if (!numCols || numCols < 1) return;

    const $table = getGridTable();
    if (!$table.length) return;

    const columnWidths = [];
    $table.find("thead tr:first-child th").each(function (index) {
      columnWidths[index] = $(this).outerWidth() || 120;
    });

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

    apex.region(REGION_ID)
      .widget()
      .find(".a-GV-w-scrollX")
      .css("overflow-x", "auto");
  }

  function applyFromItem() {
    const value = $v(ITEM_NAME) || "0";
    applyFreeze(value);
  }

  $(document).on(
    "gridviewcreate apexafterrefresh",
    "#" + REGION_ID,
    function () {
      setTimeout(applyFromItem, 200);
    }
  );

  setTimeout(applyFromItem, 800);

  window.apexIgFreezeColumns = applyFromItem;

})(window, apex, apex.jQuery);
