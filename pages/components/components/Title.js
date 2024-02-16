import { Breadcrumb, Button } from "react-bootstrap";
import { useRouter } from "next/router";


const Title = ({ title }) => {

    const router = useRouter();


    return (
        <div className="breadcrumb-header justify-content-between mb-4">
            <div className="left-content">
                <span className="main-content-title mg-b-0 mg-b-lg-1">
                    {title}
                </span>
            </div>
            <div className="justify-content-center mt-2">
                <Breadcrumb className="breadcrumb">
                    <Button variant="" type="button" className="btn button-icon btn-sm btn-outline-secondary me-1"
                        onClick={() => router.back()}>
                        <i class="bi bi-arrow-left"></i> <span className="ms-1">{"Retour"}</span>
                    </Button>
                </Breadcrumb>
            </div>
        </div>
    )
}

export default Title
