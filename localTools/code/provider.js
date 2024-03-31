async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  await loadTool('AIScheduleTools'); 
  try {
      const htmlContent = document.documentElement.outerHTML; 
      const regex = /data\s*=\s*(\{.*?\});/s;
      const matches = htmlContent.match(regex);
      if (matches && matches.length > 1) {
          const dataObject = JSON.parse(matches[1]);
          return JSON.stringify(dataObject);
      } else {
          error = "Please Login Timetable Page"
          AIScheduleAlert(error);
          return 'do not continue'; 
      }
  } catch (error) {
      console.error(error);
      AIScheduleAlert(error.message);
      return 'do not continue'; 
  }
}
