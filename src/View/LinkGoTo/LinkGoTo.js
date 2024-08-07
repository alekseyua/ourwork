import WithRouter from "../../HOC/WithRouter";
import { openOnlyURl } from "../../helpers/helpers";

/**
 * @params {
 *  position: 'flex-start' | 'center' | 'flex-end',
 *  url: 'url link go to',
 *  mt: 'marginTop: => 20' integer
 * }
 */
const LinkGoTo = ({
    url,
    mt,
    mb,
    fontSize = 12,
    position,
    children,
    color,
    style,
    navigate,
    onClick,
    state = {}
}) => {
    const handlerClickLink = (url, state = {}) => {
        if (!url.includes('http')) {
            return navigate(`${url}`, { state: { ...state } });
        }
        return openOnlyURl(url)
    }
    return (
        <div
            style={{
                display: 'flex',
                width: 'max-content',
                justifyContent: position,
                color: `var(--text-color)`,
                marginTop: `${mt}px`,
                marginBottom: `${mb}px`,
                cursor: 'pointer',
                border: `1px solid var(--border-color)`,
                backgroundColor: 'var(--background-color-block)',
                borderRadius: 7,
                fontSize: `${fontSize}px`,
                padding: '4px 12px 0px',
                minHeight: 30,
                fontWeight: 400,
                ...style
            }}

            onClick={() => onClick ? onClick() : handlerClickLink(url, state)}
        >
            {children}
        </div>
    )
}

export default WithRouter(LinkGoTo);