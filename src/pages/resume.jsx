// /resume
import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/NavBar/NavBar"
import Home from "@/components/resume/Home"
import PrivateRoute from "@/components/PrivateRoute"

export default function Resume() {
    return (
        <PrivateRoute>
            <div className="cont">
                <Navbar />
                <div className="main">
                    <Home />
                </div>
                <Footer />
            </div>
        </PrivateRoute>
        
    )
}