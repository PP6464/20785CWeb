import './loading.css'

interface LoadingProps {
  size: string // size of animation
  color: string // whether or not to use dark text and logo
}

function Loading(props: LoadingProps) {
  return (
    <div id="loading-container">
      <h1 style={{fontSize: props.size, color: props.color}}>2</h1>
      <img style={{height: props.size}} src={props.color === "black" ? "/assets/logo.png" : "/assets/logo-light.png"} alt="GEAR" />
      <h1 style={{fontSize: props.size, color: props.color}}>785C</h1>
    </div>
  )
}

export default Loading
