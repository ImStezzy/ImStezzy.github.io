import React, { useState } from "react";
import emailjs from "emailjs-com";
import DOMpurify from "dompurify";

export default function ContactMenu() {
    const initialState = {
        nama: "",
        email: "",
        message: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateErrors = validateForm();
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            return;
        }

        setIsLoading(true);

        const { nama, email, message } = formData;
        const sanitizeData = {
            nama: "Nama:" + DOMpurify.sanitize(nama),
            email: "Email:" + DOMpurify.sanitize(email),
            message: "Message:" + DOMpurify.sanitize(message),
        };

        const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const userID = process.env.REACT_APP_EMAILJS_USER_ID;

        emailjs
            .send(serviceID, templateID, sanitizeData, userID)
            .then((Response) => {
                console.log("Oke, email sukses terkirim!", Response.text);
                setFormData(initialState);
                setErrors({});
                setIsSent(true);
            })
            .catch((error) => {
                console.error("Email gagal terkirim!", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const validateForm = () => {
        const { nama, email, message } = formData;
        const errors = {};

        if (!nama.trim()) {
            errors.nama = "Nama diperlukan";
        }

        if (!email.trim()) {
            errors.email = "Email diperlukan";
        } else if (!isValidEmail(email)) {
            errors.email = "Format emailmu salah";
        }

        if (!message.trim()) {
            errors.message = "Pesan diperlukan";
        }

        return errors;
    };

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    return (
        <div className="contact-menu">
            {!isSent && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nama">Nama:</label>
                        <input
                            type="text"
                            id="nama"
                            name="nama"
                            placeholder="Nama"
                            value={formData.nama}
                            onChange={handleChange}
                            className={errors.nama ? "error" : ""}
                            disabled={isLoading}
                        />
                        {errors.nama && (
                            <span className="error-message">{errors.nama}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "error" : ""}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            className={errors.message ? "error" : ""}
                            disabled={isLoading}
                        ></textarea>
                        {errors.message && (
                            <span className="error-message">{errors.message}</span>
                        )}
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "SENDING..." : "SUBMIT"}
                    </button>
                </form>
            )}
            {isSent && (
                <div className="success-message">
                    <p>BERHASIL!</p>
                    <p>Pesanmu berhasil terkirim!</p>
                    <p>Sekarang kamu dapat meninggalkan halaman ini kapan pun, Terima Kasih!</p>
                </div>
            )}

            {/* Tambahkan Button GitHub & LinkedIn */}
            <div className="social-links">
                <a href="https://github.com/ImStezzy" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        alt="GitHub"
                        className="social-icon"
                    />
                </a>
                <a href="https://www.linkedin.com/in/alkhairijusuf/" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                        alt="LinkedIn"
                        className="social-icon"
                    />
                </a>
            </div>
        </div>
    );
}
