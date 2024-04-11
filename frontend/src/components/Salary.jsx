import { useSelector } from 'react-redux';
import { selectors } from '../slices/lessons';
import { useState } from 'react';

const Salary = () => {
  const lessons = useSelector(selectors.selectAll);
  const date = new Date();
  const monthName = date.toLocaleString('default', { month: 'long' });
  const [salary, setSalary] = useState(0);
  const lessonsMonth = lessons.filter((lesson) => {
    const lessonDate = new Date(lesson.lessonDate);
    const lessonMonth = lessonDate.toLocaleString('default', { month: 'long' });
    return lessonMonth === monthName && date.getDate() >= lessonDate.getDay() && lessonDate.getFullYear() === 2024;
  });
  lessonsMonth.sort((a, b) => {
    const date1 = new Date(a.lessonDate);
    const date2 = new Date(b.lessonDate);

    if (date1.getTime() > date2.getTime()) {
      return 1;
    }
    if (date1.getTime() < date2.getTime()) {
      return -1;
    }
    return 0;
  });
  const weeks = [];
  let week = [];
  lessonsMonth.forEach((lesson) => {
    if (new Date(lesson.lessonDate).getDay() === 1 && week.length !== 0) {
      if (new Date(week[week.length - 1].lessonDate).getDay() === 0) {
        weeks.push(week);
        week = [];
      }
    };
    week.push(lesson);
  });
  weeks.push(week);
  console.log(weeks);
  return <span>{salary}</span>

}

export default Salary;