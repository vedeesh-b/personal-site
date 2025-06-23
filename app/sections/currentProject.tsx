import Card from '~/components/card';
import headshot from '../assets/headshot.webp'

function CurrentProject() {
    const currentProject = {
        layout: {
          key: "Currently building",
          title: "P1 Dashboard",
          text: "Process behind building P1 Dashboard",
          btn: <button>More info</button>
        },
        src: headshot,
        alt: "P1 dashboard img",
      };
  return (
    <div id='project-container'>
        <Card {...currentProject} />
    </div>
  )
}

export default CurrentProject