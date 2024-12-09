import { IPropertiesSchema } from "@/public/data/dataInterface";


const AttributeTag = (attributes: IPropertiesSchema) => {
    return (
        <>
            {attributes && attributes.CI && (
                <p className="tag tag-primary">
                    CI
                </p>
            )}
            {attributes && attributes.HI && (
                <p className="tag tag-primary">
                    HI
                </p>
            )}
        </>
    );
};

export default AttributeTag;