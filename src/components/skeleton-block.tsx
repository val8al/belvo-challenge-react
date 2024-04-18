import { Box, Skeleton, SkeletonOwnProps } from "@mui/material"

export const SkeletonBlock = () => {
    const skeletonProps: SkeletonOwnProps = {animation: "wave", height: 100}
    return (
        <Box padding={{ xs: 2, md: 8}}>
            <Skeleton {...skeletonProps}/>
            <Skeleton {...skeletonProps}/>
            <Skeleton {...skeletonProps}/>
            <Skeleton {...skeletonProps}/>
        </Box>
    )
}