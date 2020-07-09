import React from 'react';
import MainNav from './nav/MainNav';
import GitHubIcon from '@material-ui/icons/GitHub';

export default class Page extends React.Component {
    render() {
        const footerCss = {
            width: "100%",
            backgroundColor: "white",
            height: "30px",
            // position: "fixed",
            bottom: "0",
            paddingTop: "20px",
            paddingBottom: "40px",
            color: "#3f51b5",
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase"
        };
        const style = {
            footerCss: footerCss,
            textCenter: { textAlign: "center" },
            link: {
                textDecoration: "none",
                color: "#3f51b5"
            }
        }

        return (
            <div>
                <MainNav />
                { this.props.body }
                <footer style={style.footerCss}>
                    <div style={style.textCenter}>
                        <div>
                            <GitHubIcon fontSize="small" />
                        </div>
                        <span>
                            <a style={style.link} href="https://github.com/rafaelsegalla/desofuscador_frontend" target="_blank">
                                GR SADS 2019/1 - Projeto Integrador - 3° Semestre
                            </a>&nbsp;-&nbsp;
                            <a style={style.link} href="https://github.com/robertaavila" target="_blank">
                                robertaavila
                            </a>&nbsp;&nbsp;
                            <a style={style.link} href="https://github.com/rafaelsegalla" target="_blank">
                                rafaelsegalla
                            </a>&nbsp;&nbsp;
                            <a style={style.link} href="https://github.com/iurysr" target="_blank">
                                iurysr
                            </a>
                        </span>
                    </div>
                </footer>
            </div>
        );
    }
}