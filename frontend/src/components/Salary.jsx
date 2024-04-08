import { useSelector } from 'react-redux';
import { selectors } from '../slices/lessons';

const Salary = () => {
    const lessons = useSelector(selectors.selectAll);
    const date = new Date()
    const monthName = date.toLocaleString('default', { month: 'long' });
    const lessonsMonth = lessons.filter((lesson) => {
        const lessonDate = new Date(lesson.lessonDate)
        const lessonMonth = lessonDate.toLocaleString('default', { month: 'long' });
        return lessonMonth === monthName && date.getDate() >= lessonDate.getDay();
    });
    
    // const getPrice = (type) => {
    //   if (type)
    // };
    // const salary = lessonsMonth.reduce((acc, lesson) => acc + number, 0)
    return <span></span>

}

export default Salary;