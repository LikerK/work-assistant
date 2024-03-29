import { useSelector } from 'react-redux';
import cn from 'classnames';
import Alert from 'react-bootstrap/Alert';
import { selectors } from '../slices/lessons';
import { ReactComponent as CopyIcon } from '../assets/copy.svg';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Scedule = () => {
  const lessons = useSelector(selectors.selectAll);
  const date = new Date();
  const lessonsToday = lessons.filter(lesson => {
    const lessonDate = new Date(lesson.lessonDate);
    return lessonDate.getDate() === date.getDate() && lessonDate.getMonth() === date.getMonth();
  });
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className="lessons bg-light border border-light h-100 my-3 rounded p-3">
        <h4>Сегодня</h4>
        <hr />
        {lessonsToday.map((lesson) => {
          // const day = lesson.lessonDate.slice(8, 11);
          const time = lesson.lessonDate.slice(16, 21);
          const lessonClass = cn('p-2', 'm-1', 'd-flex', 'flex-column', 'border', 'rounded', {
            'bg-pass': !lesson.passed,
            'bg-pass': lesson.passed
          });

          return (
            <div key={lesson.id} className={lessonClass}>
              <span className="my-1 fw-bold">{lesson.name}</span>
              <span>{time}</span>
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
    </>
)};

export default Scedule;
