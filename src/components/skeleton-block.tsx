import { Box, Skeleton, SkeletonOwnProps } from "@mui/material"

export const SkeletonBlock = () => {
    const skeletonProps: SkeletonOwnProps = {animation: "wave", height: 100}
    return (
        <Box sx={{ width: window.innerWidth }}>
            <Skeleton {...skeletonProps}/>
            <Skeleton {...skeletonProps}/>
            <Skeleton {...skeletonProps}/>
            <Skeleton {...skeletonProps}/>
        </Box>
    )
}