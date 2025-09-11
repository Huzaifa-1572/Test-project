import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomButton from 'src/Common/CustomButton'
import { EDIT_HANDLER, GET_IMAGE_HANDLER } from 'src/Utils/CommonFunctions/COFormSubmission'
import { generateFieldValue, getReviewApplicationData, getUUID, isSmallScreen } from 'src/Utils/Helpers'
import styles from './index.module.scss'
import { FaLock } from "react-icons/fa"
import { HiViewfinderCircle } from "react-icons/hi2"
import { IoMdWarning } from "react-icons/io"
import REVIEW_UNDRAW from 'src/Assets/images/reviewUndraw.svg'
import REVIEW_UNDRAW_SM from 'src/Assets/Icons/reviewIcon.png'
import ImageDailog from 'src/Common/ImageDialog'
import usePostDataToServer from 'src/Hooks/usePostdataToServer'
import postRequestSuccess from 'src/Utils/CommonFunctions/postRequestSuccess'


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
    }

    const handleDailogClose = () => {
        setopenDailog(false)
    }

    function onSuccessfullGetImage(response) {
        const IMAGE = response?.data?.data?.imageData;
        setFieldData(prev => ({
            ...prev,
            imageBase64: IMAGE
        }));
        setopenDailog(true);
    }

    const handleEdit = (screen_kuid) => {
        localStorage.setItem('isEdit', true)
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
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                    <h1 className={styles.topHeading}>
                        {TITLE || "Review Application"}
                    </h1>
                    <img src={REVIEW_UNDRAW} alt='review-application' height='80px' width='100' />
                </Box>

                {/* FOR MOBILE */}
                <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', alignItems: 'center' }}>
                    <img src={isSmallScreen() ? REVIEW_UNDRAW_SM : REVIEW_UNDRAW} alt='review-application' height='80px' width='80' />
                    <h1 className={styles.topHeading}>
                        {TITLE || "Hey! Review Your Application"}
                    </h1>
                </Box>
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
                        <Box className={styles.discrepancyIcon}>
                            <IoMdWarning size={24} color='red' />
                        </Box>
                        <Box className={styles.disContents}>
                            <div className={`${styles.desHeading} ${styles.topHeading}`}>{"Discrepant Customer!" || 'N/A'}</div>
                            <div className={`${styles.desText} ${styles.descriptionPara}`}>{DISCREPANT_MESSAGE || 'N/A'}</div>
                        </Box>
                    </div>
                }

                <div className={styles.contentContainer}>
                    {SECTIONS?.map((section) => {
                        return (
                            <Box key={getUUID()}>
                                {/* TABLE HEADER */}
                                <div className={styles.contentHeader}>
                                    <div className={styles.infoText}>
                                        <span className={styles.stepTitle}>{section['summary-table-meta']['title2']}</span>
                                    </div>
                                    {section['summary-table-meta'].editable ? <div className={styles.editBtn} onClick={() => handleEdit(section['summary-table-meta']?.['editable-meta']?.['screen_kuid'])}>Edit</div> : <div className={styles.editBtn}><FaLock size={15} /></div>}
                                </div>

                                {/*TABLE BODY*/}
                                <Box className={styles.contentBody} sx={{ padding: { xs: '5px', md: '20px' } }}>
                                    {section?.fields?.map(field =>
                                        field.value && (
                                            <div className={`${styles.contentRow} ${field.hasDiscrepancy ? styles.lightRedBg : ''}`} key={getUUID()}>
                                                <Grid container>
                                                    <Grid item xs={6} className={styles.label}>{field.label}</Grid>
                                                    {
                                                        field['value-type'] !== 'image' && (
                                                            <Grid item sm={6} xs={6} lg={6} className={`${field['value-type'] !== 'image' ? '' : styles.clickable} ${!!field.locked ? styles.locked : ''}`}>
                                                                <div className={styles.value}>
                                                                    {generateFieldValue(field)}
                                                                </div>
                                                            </Grid>
                                                        )

                                                    }
                                                    {
                                                        field['value-type'] === 'image' && (
                                                            <Grid item sm={6} xs={6} lg={6} className={styles.value} sx={{ display: 'flex', justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
                                                                {
                                                                    field.value === 'Y' && (
                                                                        <span className={styles.previewButton} onClick={(e) => handleDailogOpen(e, field)}>
                                                                            <HiViewfinderCircle size={20} />
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
                            </Box>
                        )
                    })}
                </div>

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