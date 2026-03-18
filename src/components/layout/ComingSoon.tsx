import { Link } from "react-router-dom";

const ComingSoon = () => {

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">Coming Soon</h1>
            <p>This feature is under development.</p>
            <p>Meanwhile, you can play Arcade modes.</p>
            <Link to={'/arcade'} className="px-3 py-2 bg-primary rounded">To Arcade</Link>
        </div>
    )
}

export default ComingSoon;