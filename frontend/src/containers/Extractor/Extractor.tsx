import { useState } from "react";
import Output from "../../components/Output/Output";
import UploadFileForm from "../../components/UploadFileForm/UploadFileForm";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const extract = async (formData: FormData) => {
    const response = await fetch(`${BACKEND_URL}/extract`, {
        method: 'POST',
        body: formData
    })
    const parsed = await response.json();
    return parsed.text ?? parsed.message ?? ''
}

const Extractor: React.FC = () => {
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(false)
    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOutput('')
        setLoading(true)
        const text = await extract(new FormData(event.currentTarget))
        setOutput(text)
        setLoading(false)
    }
    return (
        <>
            <UploadFileForm
                title="PDF Extractor"
                fieldName="file"
                fieldAccept="application/pdf"
                buttonLabel={loading ? 'Loading...' : 'Extract'}
                buttonDisabled={loading}
                onSubmit={submitHandler}
            />
            <Output text={output} />
        </>
    );
};

export default Extractor;