import { useSelector } from 'react-redux';
import cn from 'classnames';
import Alert from 'react-bootstrap/Alert';
import { selectors } from '../slices/lessons';
import { ReactComponent as CopyIcon } from '../assets/copy.svg';
import { ReactComponent as LinkIcon } from '../assets/link.svg';
import { Button } from 'react-bootstrap';

const Scedule = () => {
  const lessons = useSelector(selectors.selectAll);
  const date = new Date();
  const lessonsToday = lessons.filter(lesson => {
    const lessonDate = new Date(lesson.lessonDate);
    return lessonDate.getDate() === date.getDate() && lessonDate.getMonth() === date.getMonth();
  });

  lessonsToday.sort((a, b) => {
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
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className='h-100 d-flex flex-column justify-content-between'>
      <div className="h-100 bg-light border border-light my-3 rounded p-3">
        <h4>Сегодня</h4>
        <hr />
        {lessonsToday.map((lesson) => {
          // const day = lesson.lessonDate.slice(8, 11);
          const isCompleted = date.getTime() > new Date(lesson.lessonDate).getTime();
          console.log(isCompleted);
          const time = lesson.lessonDate.slice(16, 21);
          const lessonClass = cn(
            'p-2',
            'm-1',
            'd-flex',
            'justify-content-between',
            'align-items-center',
            'border',
            'rounded',
            isCompleted ? ['bg-light', 'text-muted'] : ['bg-pass', 'fw-bold'],
          );

          return (
            <div key={lesson.id} className={lessonClass}>
              <div className='d-flex align-items-center'>
                <span className='m-1'>{time}</span>
                <span>|</span>
                <span className="m-1">{lesson.name}</span>
              </div>
              <a href={lesson.link}>
                <LinkIcon />
              </a>
            </div>
          );
        })}
      </div>
      <div className="copypasta">
        <Alert className="p-0" variant="light">
          <Button
            variant="light"
            type="button"
            className="border-0 p-3 bg-light w-100"
            onClick={() => copyText('Нагорный Кирилл')}
          >
            <div className="d-flex justify-content-between" >
              <span>Нагорный Кирилл</span>
              <CopyIcon />
            </div>
          </Button>
        </Alert>
        <Alert className="p-0" variant="light">
          <Button
            variant="light"
            type="button"
            className="border-0 p-3 bg-light w-100"
            onClick={() => copyText('nagorniykirill@gmail.com')}
          >
            <div className="d-flex justify-content-between" >
              <span>nagorniykirill@gmail.com</span>
              <CopyIcon />
            </div>
          </Button>
        </Alert>
      </div>
    </div>
  )
};

export default Scedule;
