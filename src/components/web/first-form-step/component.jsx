"use client";

// others
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// components
import FormStepWrapper from "@web/form-step-wrapper/component";

// css
import styles from "./styles.module.css";

// regexs
const enRegex = /^[A-Za-z]+$/;
const phoneRegex = /^(?:\+[1-9][0-9]{7,14}|[0-9]{10})$/;
const onlyDecimalRegex = /[^\d+]/g;

const schema = z.object(
    {
        name: z.string().min(1).max(50).regex(enRegex),
        surname: z.string().min(1).max(50).regex(enRegex),
        address: z.string().min(1).max(255),
        job_desc: z.string().min(1).max(500),
        bwt: z.enum(["whatsapp", "text", "phone"]),
        number: z.string().transform(v => v.replace(onlyDecimalRegex, "")).refine(v => phoneRegex.test(v))
    }
);

// should be insert in ul
export default function FirstFormStep() {
    const { 
        register,
        formState,
        formState: { errors }, 
        trigger,
    } = useForm(
        {
            defaultValues: {
                "name": "",
                "surname": "",
                "address": "",
                "job_desc": "",
                "bwt": "whatsapp",
                "number": ""
            },
            resetOptions: {
                keepDefaultValues: true
            },
            resolver: zodResolver(schema),
            mode: "onChange"
        }
    );

    return (
        <FormStepWrapper 
            nextCheck={ 
                e => {
                    trigger().then();

                    return formState.isValid;
                }
            }
        >
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={
                            clsx(
                                errors.name && styles.input_con_error,
                                styles.input_con
                            )
                        }
                    >
                        <label className={styles.input_title} htmlFor="name">Name</label>
                        <input
                            {...register("name")}
                            type="text"
                            className={styles.input} 
                            id="name" 
                            maxLength={50}
                        />
                    </div>
                    <div className={
                            clsx(
                                errors.surname && styles.input_con_error,
                                styles.input_con
                            )
                        }
                    >
                        <label className={styles.input_title} htmlFor="surname">Surname</label>
                        <input
                            {...register("surname")}
                            type="text" 
                            className={styles.input} 
                            id="surname"
                            maxLength={50}
                        />
                    </div>
                </div>
                <div className={
                        clsx(
                            errors.address && styles.input_con_error,
                            styles.input_con
                        )
                    }
                >
                    <label className={styles.input_title} htmlFor="address">Address</label>
                    <input
                        {...register("address")}
                        type="text" 
                        className={styles.input} 
                        id="address"
                        maxLength={255}
                    />
                </div>
                <div className={
                        clsx(
                            errors.job_desc && styles.input_con_error,
                            styles.input_con
                        )
                    }
                >
                    <label className={styles.input_title} htmlFor="job_desc">Job description</label>
                    <input  
                        {...register("job_desc")}
                        type="text" 
                        className={styles.input}
                        id="job_desc"
                        maxLength={500}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.input_con}>
                        <label className={styles.input_title} htmlFor="bwt">The best way to get in touch</label>
                        <select
                            {...register("bwt")}
                            id="bwt" 
                            className={styles.select}
                        >
                            <option value="whatsapp">WhatsApp</option>
                            <option value="phone">Phone</option>
                            <option value="text">Text</option>
                        </select>
                    </div>
                    <div className={
                            clsx(
                                errors.number && styles.input_con_error,
                                styles.input_con
                            )
                        }
                    >
                        <input
                            {...register("number")}
                            type="text" 
                            className={styles.input} 
                            placeholder="Number"
                            maxLength={20}
                        />
                    </div>
                </div>
            </div>
        </FormStepWrapper>
    )
}