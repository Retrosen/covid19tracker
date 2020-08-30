import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";

import styles from './InfoBox.module.css';

function InfoBox({ title, cases, total }) {
    return (
        <Card className={styles.infoBox}>
            <CardContent>
                {/* Title */}
                <Typography className={styles.infoBox__title} color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className={styles.infoBox__cases}>{cases}</h2>

                {/* 1.2M Total */}
                <Typography className={styles.infoBox__deaths} color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
