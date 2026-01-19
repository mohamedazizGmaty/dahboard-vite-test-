import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LandingPage } from "@/pages/LandingPage"
import { OnboardingFlow } from "@/components/OnboardingFlow"
import { Layout } from "@/components/Layout"
import Login from "@/components/Login"
import SignUp from "@/components/SignUp"

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route path="/onboarding" element={<OnboardingFlow />} />
            </Routes>
        </Router>
    )
}

export default App