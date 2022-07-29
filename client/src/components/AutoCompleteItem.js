import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Anchor, Text } from "@mantine/core";

const AutoCompleteItem = forwardRef(({ id, value, onMouseDown, ...rest }, ref) => (
    <div ref={ref} {...rest}>
        <Anchor component={Link} to={`definition/${id}`}>
            <Text>{value}</Text>
        </Anchor>
    </div>
));

export default AutoCompleteItem