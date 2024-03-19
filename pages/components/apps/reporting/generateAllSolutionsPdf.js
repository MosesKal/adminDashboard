import SolutionTemplate from "@/pages/components/apps/reporting/solutionTemplate";

const GenerateAllSolutionsPdf = ({solutions, chartImage, isCuratedSolution}) => {

    return (
        <>
            <SolutionTemplate solutions={solutions} chartImage={chartImage} isCuratedSolution={isCuratedSolution}/>
        </>
    );
};

GenerateAllSolutionsPdf.propTypes = {};

GenerateAllSolutionsPdf.defaultProps = {};

GenerateAllSolutionsPdf.layout = "Contentlayout";

export default GenerateAllSolutionsPdf