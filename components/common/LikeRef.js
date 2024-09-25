import React, {
    forwardRef,
    useEffect,
    useImperativeHandle
} from 'react';

import $ from 'jquery';
import { useSelector } from 'react-redux';
import { AddLikeAction, GetLikeDataAction } from '@/actions/axios/user.axios';

export const LikeRef = forwardRef((props, ref) => {
    // LikeList,setLikedTokenList
    // console.log('likrreeeefff',props,ref)
    const { accountAddress } = useSelector(state => state.LoginReducer.AccountDetails);
    const { payload } = useSelector(state => state.LoginReducer.User)
    // console.log('gdkfdgvfsd',payload,props.LikeList,props.setLikedTokenList,props)
    useEffect(() => {
        getLikesDataCall()
    }, [accountAddress]);
    async function getLikesDataCall () {
        // var currAddr = await getCurAddr();
        if(payload?.CustomUrl !== "") {
            var senddata = {
                CustomUrl: payload?.CustomUrl
            }
            var check = await GetLikeDataAction(senddata);
            // console.log("get Like List",check)
            if(check && check.msg) {
                props?.LikeList(check.msg);
            }
        }
    }

    useImperativeHandle(
        ref,
        () => ({
            async getLikesData() {
                getLikesDataCall();
            },
            async hitLike(data) {
                
                if (payload.CustomUrl !== "") {
                {
                    var likeData = {
                        // actions:"like",
                        CustomUrl: payload.CustomUrl,
                        NFTId: data.NFTId,
                        OwnerCustomUrl: data?.CustomUrl ?? '',
                        activity:"Liked by"
                    }
                    // console.log("like Action",likeData)
                    var resp = await AddLikeAction(likeData);
                    if(resp && resp.likeData && resp.likeData.msg && resp.likeOrUnlike) {
                        if(resp.likeData.success === 'success') {
                            //toast.success(resp.data.toast.msg, toasterOption);
                            if(
                                resp.likeData.msg
                                && typeof resp.likeOrUnlike != 'undefined'
                            ) {
                                $('.'+data.tokenCounts+'-likecount').html(resp.likeOrUnlike);
                            }
                        }
                    }
                    getLikesDataCall();
                    return resp.likeOrUnlike;
                }
                
                }
            
            }
        }),
    )
    return (
      <></>
    )
})

