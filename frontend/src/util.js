const getSchedule = (student) => {
  const { startLessons, type, lessons, name, link } = student;
  const result = [];
  const days = {};
  lessons.forEach((lesson) => {
    if (!days.hasOwnProperty(lesson.day)) {
      days[lesson.day] = [];
    };
    days[lesson.day].push(lesson.time);
  });
  const keys = Object.keys(days);
  const countLessons = { 'group': 32, 'absentia': 64, 'one': 1 }
  const startDate = new Date(startLessons);
  while (result.length !== countLessons[type]) {
    const newDate = new Date(startDate.toString());
    if (keys.includes(newDate.getDay().toString())) {
      const times = days[newDate.getDay()];
      times.forEach((time) => {
        const [hour, minute] = time.split(':');
        newDate.setHours(hour, minute);
        result.push({
          name: name,
          link: link,
          type: type,
          lessonDate: newDate.toString(),
          passed: true
        });
      })
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return result;
}

export default getSchedule;
