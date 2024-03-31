function weekDayToNumberInsensitive(weekDay) {
  const weekDays = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDayNumber = weekDays.indexOf(weekDay);
  return weekDayNumber+1;
}

function sectionTimeToSectionNumber(sectionTime) {
  const sections = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:15", "15:15", "16:15", "17:15", "18:15"];
  sectionNumber = sections.indexOf(sectionTime);
  return sectionNumber + 1; // Adding 1 because array indices start at 0, but you want sections to start at 1.
}

function convertWeekPatternToWeekNumbers(weekPattern) {
  // 找到第一个"1"出现的位置
  const startWeek = weekPattern.indexOf("1");
  const weekNumbers = [];

  // 如果未找到"1"，则直接返回空数组
  if (startWeek === -1) return weekNumbers;

  for (let i = startWeek; i < weekPattern.length; i++) {
    if (weekPattern[i] === "1") {
      // 从第一个"1"的位置开始计算周数
      weekNumbers.push(i - startWeek + 1);
    }
  }
  return weekNumbers;
}

function scheduleHtmlParser(context) {
  const context_json = JSON.parse(context)
  const courseInfos = []
  let result = []
  const class_info = context_json["student"]["allocated"]
  Object.values(class_info).forEach(value => {
    let con =  {}
    con["name"] = value["subject_description"]
    con["position"] = value["location"]
    con["teacher"] = value['activity_group_code']
    // 周
    locations = value["locations"]
    timearray = locations[0]["activityDays"]
    weekPattern = value["week_pattern"]
    weekNumbers = convertWeekPatternToWeekNumbers(weekPattern)

    con['weeks'] =  weekNumbers, // week
    duration = parseInt(value["duration"])
    duration = duration/60
    con['semestr'] = value["semester"]
    day = weekDayToNumberInsensitive(value['day_of_week'])
    con['day'] = day, 
    value["start_date"]
    section = sectionTimeToSectionNumber(value["start_time"])
    let section_list = []
    for (let i = 0; i < duration; i++){
      section_list.push(section + i)
    }
    con['sections'] = section_list 
    result.push(con)
    
  });
  return result
}