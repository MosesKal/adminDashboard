import SolutionTemplate from "@/pages/components/apps/reporting/solutionTemplate";
const GenerateCurratedSolutionsPdf = ({curratedSolutions, chartImage, isCuratedSolution, tabImage}) => {

    return (
        <>
            {curratedSolutions && chartImage && isCuratedSolution && (
                <SolutionTemplate solutions={curratedSolutions} chartImage={chartImage} isCuratedSolution={isCuratedSolution} tabImage={tabImage} />
            )}
        </>
    );
};

GenerateCurratedSolutionsPdf.propTypes = {};

GenerateCurratedSolutionsPdf.defaultProps = {};

GenerateCurratedSolutionsPdf.layout = "Contentlayout";

export default GenerateCurratedSolutionsPdf;
