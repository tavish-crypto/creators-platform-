import {Link} from "react-router-dom"
import ConnectionTest from "../components/common/ConnectionTest";
function Home(){
    return(
        <div
        style={{
            padding: "40px",
            textAlign: "center"
        }}
        >
            <h1>Welcome to Creators Platform</h1>
            <p> A place where creators can connect, share ideas and grow together.</p>
            <br />
            <Link
            to='/register'><button> Get started</button>
            </Link>
            <br />
            <br />
            <h2>Features</h2>
            <ul
             style={{
                listStyle: "none",
                padding: 0,
             }}
             >
                <li>Create your profile</li>
                <li>Share your work</li>
                <li>Connect with creators</li>
             </ul>
             <ConnectionTest />
        </div>
    )
}
export default Home;
