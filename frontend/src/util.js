const getSchedule = (student, lastId) => {
  const { startLessons, type, lessons, name, price, link } = student;
  const result = [];
  const daysObj = {};
  lessons.forEach((lesson) => {
    daysObj[lesson.day] = lesson.time;
  });
  const days = Object.keys(daysObj);
  console.log(type);
  const countLessons = { 'group': 32, 'absentia': 64, 'one': 1 }
  const dateObj1 = new Date(startLessons);
  while (result.length !== countLessons[type]) {
      console.log(result);
      const newDate = new Date(dateObj1.toString());
      if (days.includes(newDate.getDay().toString())) {
        const [ hour, minute ] = daysObj[newDate.getDay()].split(':');
        console.log(hour, minute);
        newDate.setHours(hour, minute);
        lastId += 1;
        result.push({ 
          name: name,
          price: price,
          link: link,
          type: type,
          lessonDate: newDate.toString(),
          passed: true
        });
      }
      dateObj1.setDate(dateObj1.getDate()+1);
  }
  return result;
}

export default getSchedule;
