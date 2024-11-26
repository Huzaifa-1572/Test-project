import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { CaptchaField, CheckboxField } from 'src/Components/FormFields'
import { generateFieldValue, getReviewApplicationData, getUUID, sanitizer } from 'src/Utils/Helpers'
import styles from './index.module.scss'
import CustomButton from 'src/Common/CustomButton'
import AttachmentIcon from 'src/Assets/images/attach-icon.png';
import ValidationError from 'src/Components/ValidationError'
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

                {/* TERM AND CONDITON */}
                <Box sx={{ paddingTop: "16px" }}>
                    <Box>
                        <div>
                            <h1 className={styles.topHeading}>Terms And Conditions</h1>
                        </div>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                fontSize: "16px",
                                color: "#484e53",
                                padding: "10px 20px",
                                fontWeight: "500px",
                            }}
                        >
                            <Box>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis est
                                ratione eligendi voluptate inventore, fugiat et odit excepturi rem
                                aliquid ut nulla quod voluptates in nisi, porro nihil magni enim.
                                Necessitatibus quaerat quasi voluptatibus?
                            </Box>
                            <Box>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                                voluptatem distinctio doloribus modi, velit incidunt dignissimos at,
                                eum maiores molestias odit aspernatur expedita sapiente, totam
                                officiis quidem vero nobis. Perspiciatis ex porro quaerat hic, magni
                                delectus exercitationem omnis. Harum odit est dicta corporis
                                repellat molestias fugit obcaecati officia in! Tenetur doloremque
                                deserunt rerum magni eaque, officiis tempore optio illo beatae
                                minima atque voluptatem amet, cumque adipisci dolores! Quas totam
                                deserunt, quos exercitationem, ab fugiat reprehenderit iure illo
                                incidunt, officiis explicabo? Adipisci eligendi fugit distinctio,
                                nostrum sit accusantium incidunt numquam velit eius totam nesciunt
                                repellat? Quod quidem reiciendis soluta nobis ipsa eligendi suscipit
                                atque possimus cupiditate nam at aut adipisci earum dicta fugiat,
                                molestias hic. Quos rem sequi necessitatibus nam nesciunt.
                            </Box>
                            <Box>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat,
                                accusamus porro eaque amet exercitationem explicabo asperiores!
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <div>
                            <h1 className={styles.topHeading}> Declaration and Acceptance</h1>
                        </div>
                        <CheckboxField name={"isAccepted"} label={"I hereby undertake and confirm that:"} control={control} />
                        {errors?.isAccepted && (<ValidationError message={errors?.isAccepted?.message} />)}
                        <ol
                            style={{
                                fontSize: "16px",
                                color: "#484e53",
                                padding: "10px 20px",
                                fontWeight: "600px",
                                margin: "0px",
                            }}
                        >
                            <li>
                                {" "}
                                Information provided above is true and correct in all aspects.
                            </li>
                            <li>
                                {" "}
                                Any changes in the provided information shall be notified
                                immediately.
                            </li>
                            <li>
                                {" "}
                                All applicable laws, rules, regulations, procedures, guidelines and
                                instructions, as amended from time to time, shall be adhered to.
                            </li>
                        </ol>

                        <Box className={styles.robotStyles}>
                            <Box sx={{ width: "100%", maxWidth: "400px" }}>
                                <CaptchaField
                                    name={'googleCaptchaReviewApplication'}
                                    control={control}
                                    siteKey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
                                />
                                {errors?.googleCaptchaReviewApplication && (<ValidationError message={errors?.googleCaptchaReviewApplication?.message} />)}
                            </Box>
                        </Box>

                        <CustomButton label={"Submit"} />
                    </Box>
                </Box>
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