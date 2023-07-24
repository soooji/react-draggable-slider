export const SLIDE_ITEM_WIDTH = 200;
export const SLIDE_ITEM_HEIGHT = 150;
export const SLIDER_WIDTH = 800;
export const SLIDES_GAP = 8;

export const fetcher = (url: string) =>
  Promise.all(
    Array(10)
      .fill(0)
      .map((_, pageIndex) =>
        fetch(`${url}?page=${pageIndex + 1}&per_page=30`, {
          headers: {
            Authorization:
              "Client-ID wgSJ44ducmH1B_Re1Kcak8NynL_kBTSsKvEYBe5ye6k",
          },
        }).then((res) => res.json())
      )
  );
