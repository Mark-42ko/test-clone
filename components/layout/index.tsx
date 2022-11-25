import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ReactNode } from "react";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Container disableGutters={true} maxWidth={false}>
            <AppBar position="sticky">
                <Toolbar variant="dense" style={{ backgroundColor: "white", color: "black" }}>
                    <Header />
                </Toolbar>
            </AppBar>
            <main style={{ height: "120vh" }}>{children}</main>
        </Container>
    )
}