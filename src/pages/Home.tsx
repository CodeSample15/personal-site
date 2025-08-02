export const Home = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
          <img src="sunglasses.jpg" className="rounded-circle" style={{width: '200px', height: '200px', objectFit: 'cover'}}/>

          <div className="d-flex flex-column p-5">
            <h1 className="display-1">Hello!</h1>
            <h2>I'm <span className="fw-bold text-success-emphasis">Luke Crimi</span></h2>
          </div>
      </div>
    </>
  )
}
