import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { EDIT_HANDLER, GET_IMAGE_HANDLER } from 'src/Utils/CommonFunctions/COFormSubmission'
import { generateFieldValue, getReviewApplicationData, getUUID, sanitizer } from 'src/Utils/Helpers'
import styles from './index.module.scss'
import CustomButton from 'src/Common/CustomButton'
import AttachmentIcon from 'src/Assets/images/attach-icon.png';
import ImageDailog from 'src/Common/ImageDialog'
import usePostDataToServer from 'src/Hooks/usePostdataToServer'
import postRequestSuccess from 'src/Utils/CommonFunctions/postRequestSuccess'
import disc from "src/Assets/svgs/discrepancy-found-icon.svg";

const ReviewApplication = ({ setValue, getValues }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const customerCnic = getValues("customerCnic");
    const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);
    const [openDailog, setopenDailog] = useState(false)
    const [fieldData, setFieldData] = useState({})
    const { TITLE, DESCRIPTION, DISCREPANT_MESSAGE, SECTIONS } = getReviewApplicationData()
    const { mutate: mutateGetImage } = usePostDataToServer({ onPostReqSuccess: onSuccessfullGetImage, dispatch });
    const { mutate: mutateEdit } = usePostDataToServer({ onPostReqSuccess: onSuccessfullEdit, dispatch });

    const handleDailogOpen = (e, field) => {
        const kuid = field?.kuid;
        const { BODY, API_URL } = GET_IMAGE_HANDLER({ CURRENT_SCREEN, customerCnic, kuid, dispatch });
        mutateGetImage({ BODY, API_URL, dispatch });
        setFieldData(field);
        setopenDailog(true);
    }

    const handleDailogClose = () => {
        setopenDailog(false)
    }

    function onSuccessfullGetImage(response) {
        const IMAGE = response?.data?.data?.imageBase64;
        setFieldData(prev => ({
            ...prev,
            imageBase64: IMAGE
        }));
    }

    const handleEdit = (screen_kuid) => {
        localStorage.setItem('isEditable', true)
        const { BODY, API_URL } = EDIT_HANDLER({ CURRENT_SCREEN: screen_kuid, customerCnic, dispatch });
        mutateEdit({ BODY, API_URL, dispatch });
    }

    function onSuccessfullEdit(response) {
        postRequestSuccess({ response, dispatch, navigate, setValue });
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
                {/* DISCREPANT MESSAGE */}
                {
                    DISCREPANT_MESSAGE &&
                    <div className={styles.discrepancy}>
                        <div className={styles.discrepancyIcon}>
                            <img src={disc} alt="" />
                        </div>
                        <div className={styles.disContents}>
                            <div className={`${styles.desHeading} ${styles.topHeading}`}>{"Discrepant Customer" || 'N/A'}</div>
                            <div className={`${styles.desText} ${styles.descriptionPara}`}>{DISCREPANT_MESSAGE || 'N/A'}</div>
                        </div>
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
                                {section['summary-table-meta'].editable && <div className={styles.editBtn} onClick={() => handleEdit(section['summary-table-meta']?.['editable-meta']?.['screen_kuid'])}>EDIT</div>}
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