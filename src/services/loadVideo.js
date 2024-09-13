import * as httpRequest from '~/utils';

export const loadVideo = async (type, page) => {
  try {
    const res = await httpRequest.get('videos', {
      params: {
        type,
        page,
      },
    });

    if (res.status === 0) {
      return [];
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
