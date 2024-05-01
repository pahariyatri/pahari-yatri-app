import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";

const PackageCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    )
}
export default PackageCard;
