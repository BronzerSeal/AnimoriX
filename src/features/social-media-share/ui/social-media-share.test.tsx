import { render, screen } from "@testing-library/react";
import SocialMediaShare from "./social-media-share";
import { shares } from "../consts/shares";

describe("SocialMediaShare", () => {
  it("should correctly render all buttons", () => {
    render(<SocialMediaShare />);
    const socialBtns = screen.getAllByRole("button");
    expect(socialBtns).toHaveLength(shares.length);
  });

  it("should correctly render 4 buttons in fourBtns mode", () => {
    render(<SocialMediaShare fourBtns={true} />);
    const socialBtns = screen.getAllByRole("button");
    expect(socialBtns).toHaveLength(4);
  });

  it("should not render counts when variant is clear", () => {
    render(<SocialMediaShare variant="clear" />);
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });
});
