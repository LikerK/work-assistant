// const getArrayLessons = (date1, date2) => {
//   const result = [];
//   const dateObj1 = new Date(date1);
//   const dateObj2 = new Date(date2);
//   while (dateObj1.toString() !== dateObj2.toString()) {
//       const newDate = new Date(dateObj1.toString());
//       result.push(newDate);
//       dateObj1.setDate( dateObj1.getDate()+1);
//   }
//   return result;
// }
const getSchedule = (student, lastId) => {
  const { startLessons, type, lessons, name, price } = student;
  const result = [];
  const daysObj = {};
  lessons.forEach((lesson) => {
    daysObj[lesson.day] = lesson.time;
  });
  const days = Object.keys(daysObj);
  const countLessons = { 'group': 32, 'absentia': 64, 'one': 1 }
  const dateObj1 = new Date(startLessons);
  while (result.length !== countLessons[type]) {
      const newDate = new Date(dateObj1.toString());
      if (days.includes(newDate.getDay().toString())) {
        const [ hour, minute ] = daysObj[newDate.getDay()].split(':');
        console.log(hour, minute);
        newDate.setHours(hour, minute);
        lastId += 1;
        result.push({ 
          name: name,
          price: price,
          type: type,
          lessonDate: newDate.toString(),
          passed: true 
        });
      }
      dateObj1.setDate(dateObj1.getDate()+1);
  }
  console.log(result);
  return result;
}


// const getSchedule = (student, lastId) => {
//   const { startLessons, type } = student;
//   const schedule = [];
//   const lessonsArray = getArrayLessons(startLessons, type, student.lessons);
//   lessonsArray.forEach((lesson) => {
    
//   });
  // student.lessons.forEach((lesson) => {
  //   const scheduleForDay = lessonArray.filter((l) => l.getDay() === Number(lesson.day));
  //   const [ hours, minutes ] = lesson.time.split(':');
  //   const lessonObj =  scheduleForDay.map((date) => {
  //     const todaуDate = new Date();
  //     const id = lastId.toString();
  //     lastId += 1;
  //     const passed = date.getTime() < todaуDate.getTime();
  //     date.setHours(hours, minutes);
  //     return {
  //       id: id,
  //       studentName: student.name,
  //       price: student.price,
  //       lessonDate: date.toString(),
  //       passed: passed
  //     };
  //   });
  //   schedule.push(...lessonObj);
  // });
  // return schedule;


export default getSchedule;