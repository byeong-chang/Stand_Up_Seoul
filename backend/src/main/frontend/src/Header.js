import { Link } from "react-router-dom";
import './App.css';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <Link to="/" className="navbar-brand">스탠드업서울</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to="/" className="nav-link">가고싶은곳</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link">미래 혼잡도 보기</Link></li>
                        <li className="nav-item"><Link to="/login" className="nav-link">로그인</Link></li>
                        <li className="nav-item"><Link to="/signup" className="nav-link">회원가입</Link></li>
                        <li className="nav-item"><Link to="/" className="nav-link">**</Link></li>
                        <li className="nav-item dropdown">
                            <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdownBlog" role="button" data-bs-toggle="dropdown" aria-expanded="false">**</Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                <li><Link to="/" className="dropdown-item">**</Link></li>
                                <li><Link to="/" className="dropdown-item">**</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdownPortfolio" role="button" data-bs-toggle="dropdown" aria-expanded="false">**</Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                                <li><Link to="/" className="dropdown-item">**</Link></li>
                                <li><Link to="/" className="dropdown-item">**</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
