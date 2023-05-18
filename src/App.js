import './App.css';
import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';

function App() {
  let isMouseDown = false;
  let startX = 0;
  let startY = 0;

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextmenu);

    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e?.button === 2) {
      isMouseDown = true;
      startX = e.clientX;
      startY = e.clientY;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      const tableEle = document.querySelector('.mainContainer');
      const scrollSpeed = 20; // Adjust the scroll speed as desired

      if (e.clientX < startX) {
        // Scroll left
        tableEle.scrollLeft -= scrollSpeed;
      } else if (e.clientX > startX) {
        // Scroll right
        tableEle.scrollLeft += scrollSpeed;
      }

      if (e.clientY < startY) {
        // Scroll up
        tableEle.scrollTop -= scrollSpeed;
      } else if (e.clientY > startY) {
        // Scroll down
        tableEle.scrollTop += scrollSpeed;
      }

      startX = e.clientX;
      startY = e.clientY;
    }
  };

  const handleMouseUp = () => {
    isMouseDown = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className='rootContainer'>
      <h1>Full Calendar App</h1>
      <div className="mainContainer" onMouseDown={handleMouseDown}>
        <div className='calendarBox'>
          <FullCalendar
            now="2023-05-05"
            initialDate="2023-05-05"
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[resourceTimelinePlugin, dayGridPlugin, interactionPlugin]}
            weekends={false}
            events={[
              { title: 'event 1', date: '2023-05-05' },
              { title: 'event 2', date: '2019-04-02' },
            ]}
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'customWeeks,dayGridMonth,resourceTimelineWeek'
            }}
            initialView='customWeeks'
            views={{
              customWeeks:{
                type: 'resourceTimeline',
                duration: { weeks: 2 },
                slotDuration: {days: 1},
                buttonText: 'Custom Week'
              }
            }}
            resourceAreaWidth='80px'
            weekNumbers={true}
            resourceAreaHeaderContent= ' '
            display_mode={{
              tooltip: true
            }}
            resources={[
              { id: 'a', title: 'a' },
              { id: 'b', title: 'b' },
              { id: 'c', title: 'c' },
              { id: 'd', title: 'd' },
              { id: 'e', title: 'e' },
              { id: 'f', title: 'f' },
              { id: 'g', title: 'g' },
              { id: 'h', title: 'h' },
              { id: 'i', title: 'i' },
              { id: 'j', title: 'j' },
              { id: 'k', title: 'k' },
              { id: 'l', title: 'l' },
              { id: 'm', title: 'm' },
              { id: 'n', title: 'n' },
              { id: 'o', title: 'o' },
              { id: 'p', title: 'p' },
              { id: 'q', title: 'q' },
              { id: 'r', title: 'r' },
              { id: 's', title: 's' },
              { id: 't', title: 't' },
              { id: 'u', title: 'u' },
              { id: 'v', title: 'v' },
              { id: 'w', title: 'w' }
            ]}
            dateClick={() => {}}
            locale="de"
            selectOverlap
            stickyHeaderDates
            droppable
            height="100%"
            selectable={true}
            stickyFooterScrollbar
            aspectRatio={0.8}
            editable={false}
            eventDragStop={(e) => console.log('s')}
            selectMirror={true}
            eventChange={(e) => console.log(e)}
          />
        </div>
      </div>
    </div>

  )
}

export default App