import "./Footer.css"
import { ExternalLink } from 'react-external-link';
function Footer() {

    return(
        <div className="footer">
            <p className="footer-text">Copyright reserved to NOVI Hogeschool</p>
            <p className="footer-text">Created by <ExternalLink className="footer-link" href="https://github.com/basvanderkamp" >Bas van der Kamp</ExternalLink>.</p>
        </div>


    )

}
export default Footer;