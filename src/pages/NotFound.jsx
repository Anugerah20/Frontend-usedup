import NotFounds from "../assets/not-found.svg"

const NotFound = () => {
     return (
          <div className="h-screen flex flex-col flex-wrap justify-center items-center">
               <img src={NotFounds} alt="Page Not Found" className="w-60" />
               <h3 className="text-primary text-2xl font-bold mt-5 text-center">Oppss, Page Not Found</h3>
          </div>
     )
}

export default NotFound
