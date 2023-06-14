import { Link } from "react-router-dom";

function Header(){
    return(
        //  {/* <!-- Navigation--> */}
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container px-5">
             <Link to="/" className="navbar-brand" href="index.html">스탠드업서울</Link>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                     <li className="nav-item"><a className="nav-link" href="index.html">가고싶은곳</a></li>
                     <li className="nav-item"><a className="nav-link" href="about.html">미래 혼잡도 보기</a></li>
                     <li className="nav-item"><a className="nav-link" href="contact.html">로그인</a></li>
                     <li className="nav-item"><a className="nav-link" href="pricing.html">회원가입</a></li>
                     <li className="nav-item"><a className="nav-link" href="faq.html">**</a></li>
                     <li className="nav-item dropdown">
                         <a className="nav-link dropdown-toggle" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">**</a>
                         <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                             <li><a className="dropdown-item" href="blog-home.html">**</a></li>
                             <li><a className="dropdown-item" href="blog-post.html">**</a></li>
                         </ul>
                     </li>
                     <li className="nav-item dropdown">
                         <a className="nav-link dropdown-toggle" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">**</a>
                         <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                             <li><a className="dropdown-item" href="portfolio-overview.html">**</a></li>
                             <li><a className="dropdown-item" href="portfolio-item.html">**</a></li>
                         </ul>
                     </li>
                 </ul>
             </div>
         </div>
     </nav>
    )
}

export default Header;