"use client"
import React, { useEffect } from "react";

type AdBannerTypes = {
    dataAdSlot: string,
    dataAdFormat: string,
    dataFullWidthResponsive: boolean
}

const AdBanner = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }: AdBannerTypes) => {

    useEffect(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.log(err);
        }
      }, []);

    return (
        <ins
            className="adsbygoogle"
            data-ad-client="ca-pub-7395920081704697"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
            style={{display: "inline-block", width: "728px", height: "90px"}}
        >
        </ins>
    )
}

export default AdBanner;