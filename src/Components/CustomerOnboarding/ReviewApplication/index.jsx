import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { generateFieldValue, getReviewApplicationData, getUUID, sanitizer } from 'src/Utils/Helpers'
import styles from './index.module.scss'
import CustomButton from 'src/Common/CustomButton'
import AttachmentIcon from 'src/Assets/images/attach-icon.png';
import ImageDailog from 'src/Common/ImageDialog'
import { GET_IMAGE_HANDLER } from 'src/Utils/CommonFunctions/COFormSubmission'
import { useDispatch, useSelector } from 'react-redux'
import usePostDataToServer from 'src/Hooks/usePostdataToServer'

const ReviewApplication = ({ control, getValues, errors }) => {
    const dispatch = useDispatch()
    const CURRENT_SCREEN = useSelector((state) => state?.screenState);
    const [openDailog, setopenDailog] = useState(false)
    const [fieldData, setFieldData] = useState({})
    const { TITLE, DESCRIPTION, SECTIONS } = getReviewApplicationData()
    const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullSubmission, dispatch });

    const handleDailogOpen = (e, field) => {
        const customerCnic = getValues("customerCnic");
        const kuid = field?.kuid;
        const { BODY, API_URL } = GET_IMAGE_HANDLER({ CURRENT_SCREEN, customerCnic, kuid, dispatch });
        mutate({ BODY, API_URL, dispatch });
        setFieldData(field);
        setopenDailog(true);
    }

    const handleDailogClose = () => {
        setopenDailog(false)
    }

    function onSuccessfullSubmission(response) {
        const IMAGE = response?.data?.data?.imageBase64;
        setFieldData(prev => ({
            ...prev,
            imageBase64: IMAGE
        }));
    }

    return (
        <div className={styles.topWrapper}>
            <div className={styles.reviewContentWrapper}>
                {/* TITLE */}
                <div>
                    <h1 className={styles.topHeading}>{TITLE || "Review Application"}</h1>
                </div>
                {/* DESCRIPTION */}
                {
                    DESCRIPTION &&
                    <div className={styles.descriptionPara}>
                        <p>{DESCRIPTION}</p>
                    </div>
                }

                {SECTIONS?.map((section) => {
                    return (
                        <Box key={getUUID()}>
                            {/* TABLE HEADER */}
                            <div className={styles.contentHeader}>
                                <div className={styles.stepInfo}>
                                    <div className={styles.iconCircle}>
                                        <img src={sanitizer(`src/Assets/images/review-application/${section['summary-table-meta']['icon']}`)} alt="info-icon" />
                                    </div>
                                    <div className={styles.infoText}>
                                        <span className={styles.stepNumber}>{section['summary-table-meta']['title1']}</span>
                                        <span className={styles.stepTitle}>{section['summary-table-meta']['title2']}</span>
                                    </div>
                                </div>
                                {section['summary-table-meta'].editable && <div
                                    className={styles.editBtn}>EDIT</div>}
                            </div>

                            {/*TABLE BODY*/}
                            {section?.fields?.map(field =>
                                field.value && (
                                    <div className={`${styles.contentRow} ${field.hasDiscrepancy ? styles.lightRedBg : ''}`} key={getUUID()}>
                                        <Grid container>
                                            <Grid item sm={6} xs={6} lg={6} className={styles.label}>{field.label}</Grid>
                                            {
                                                field['value-type'] !== 'image' &&
                                                (
                                                    <Grid item sm={6} xs={6} lg={6} className={`${field['value-type'] !== 'image' ? '' : styles.clickable} ${!!field.locked ? styles.locked : ''}`}>
                                                        <div className={styles.value}>
                                                            {generateFieldValue(field)}
                                                        </div>
                                                        {!!field?.locked && <div className={styles.icon}></div>}
                                                    </Grid>
                                                )

                                            }
                                            {
                                                field['value-type'] === 'image' && (
                                                    <Grid item sm={6} xs={6} lg={6} className={`${styles.value} ${styles.clickable}`}>
                                                        {
                                                            field.value === 'Y' && (
                                                                <span className={styles.previewButton} onClick={(e) => handleDailogOpen(e, field)}>
                                                                    <img src={AttachmentIcon} alt="Preview Icon" />
                                                                    Preview
                                                                </span>
                                                            )
                                                        }
                                                    </Grid>
                                                )
                                            }
                                        </Grid>
                                    </div>

                                )

                            )}
                        </Box>
                    )
                }
                )}

                <CustomButton label={"Continue"} />

                {/* POP UP FOR IMAGE PREVIEW */}
                <ImageDailog
                    openDailog={openDailog}
                    handleDailogClose={handleDailogClose}
                    title={fieldData?.label}
                    key={fieldData?.kuid}
                    documentImg={fieldData?.imageBase64}
                />
            </div>
        </div>
    )
}

export default ReviewApplication