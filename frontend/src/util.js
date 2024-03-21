const getArrayLessons = (date1, date2) => {
  const result = [];
  const dateObj1 = new Date(date1);
  const dateObj2 = new Date(date2);
  while (dateObj1.toString() !== dateObj2.toString()) {
      const newDate = new Date(dateObj1.toString());
      result.push(newDate);
      dateObj1.setDate( dateObj1.getDate()+1);
  }
  return result;
}

const getSchedule = (student, lastId) => {
  const { startLessons, finishLessons } = student;
  const schedule = [];
  const lessonArray = getArrayLessons(startLessons, finishLessons);
  student.lessons.forEach((lesson) => {
    const scheduleForDay = lessonArray.filter((l) => l.getDay() === Number(lesson.day));
    const [ hours, minutes ] = lesson.time.split(':');
    const lessonObj =  scheduleForDay.map((date) => {
      const todaуDate = new Date();
      const id = lastId.toString();
      lastId += 1;
      const passed = date.getTime() < todaуDate.getTime();
      date.setHours(hours, minutes);
      return {
        id: id,
        studentName: student.name,
        price: student.price,
        lessonDate: date.toString(),
        passed: passed
      };
    });
    schedule.push(...lessonObj);
  });
  return schedule;
}


export default getSchedule;