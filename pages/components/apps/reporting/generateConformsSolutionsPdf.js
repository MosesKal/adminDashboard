import SolutionTemplate from "@/pages/components/apps/reporting/solutionTemplate";

const GenerateConformsSolutionsPdf = ({conformsSolutions, chartImage, isCuratedSolution}) => {

    return (
        <>
            <SolutionTemplate solutions={conformsSolutions} chartImage={chartImage} isCuratedSolution={isCuratedSolution}/>
        </>
    );
};

GenerateConformsSolutionsPdf.propTypes = {};

GenerateConformsSolutionsPdf.defaultProps = {};

GenerateConformsSolutionsPdf.layout = "Contentlayout";

export default GenerateConformsSolutionsPdf;
