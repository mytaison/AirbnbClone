"use client";
import dynamic from "next/dynamic";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../shared/Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../shared/CategoryInput";
import {
  useForm,
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
  SubmitHandler,
} from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../shared/Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((prev) => {
      if (prev !== STEPS.CATEGORY) {
        return prev - 1;
      }
      return prev;
    });
  };

  const onForward = () => {
    setStep((prev) => {
      if (prev !== STEPS.PRICE) {
        return prev + 1;
      }
      return prev;
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onForward();
    }
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing is created!");
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
        router.refresh();
      })
      .catch((err) => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle={"Pack a category"}
        center={false}
      ></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => {
          return (
            <div key={item.label}>
              <CategoryInput
                label={item.label}
                selected={category === item.label ? true : false}
                onClick={(category) => setCustomValue("category", category)}
                icon={item.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    if (!category) {
      onBack();
    } else {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title={"Where is your place located?"}
            subtitle={"Help guests find you!"}
            center={false}
          ></Heading>
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          ></CountrySelect>
          <Map center={location?.latlng}></Map>
        </div>
      );
    }
  }

  if (step === STEPS.INFO) {
    if (!location) {
      onBack();
    } else {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your place"
            subtitle="What amenities do you have?"
            center={false}
          ></Heading>
          <Counter
            title={"Guests"}
            subTitle={"How many guests do you allow?"}
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <Counter
            title={"Rooms"}
            subTitle={"How many rooms do you have?"}
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <Counter
            title={"Bathrooms"}
            subTitle={"How many bathrooms do you have?"}
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      );
    }
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        ></Heading>
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        ></ImageUpload>
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    if (!imageSrc) {
      onBack();
    } else {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title={"How would you describe your place?"}
            subtitle={"Short and sweet works best!"}
          ></Heading>
          <Input
            id={"title"}
            label={"Title"}
            type={"textarea"}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          ></Input>
          <hr />
          <Input
            id={"description"}
            label={"Description"}
            type={""}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          ></Input>
        </div>
      );
    }
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Now, set your price"}
          subtitle={"How much do you charge per night?"}
        ></Heading>
        <Input
          id={"price"}
          label={"Price"}
          formatPrice={true}
          type={"number"}
          disabled={isLoading}
          register={register}
          errors={errors}
        ></Input>
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secodaryActionLabel={secondaryLabel}
      secondaryAction={onBack}
      title="Airybnb your home!"
      body={bodyContent}
      disabled={submitDisabled}
    />
  );
};

export default RentModal;
