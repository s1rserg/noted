import { useState, useEffect, type FC } from 'react';
import { ImageSlider } from 'components/ImageSlider';
import type { Nullable } from 'types/utils';
import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import { AddPhotoAlternate, DeleteOutline, CheckCircleOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { UserAvatarMedia } from 'api';

interface Props {
  avatars: UserAvatarMedia[];
  mainAvatarId: Nullable<number>;
  onUpload: () => void;
  onSetMain: (mediaId: UserAvatarMedia['id']) => Promise<void>;
  onDelete: (mediaId: UserAvatarMedia['id']) => Promise<void>;
}

export const AvatarSlider: FC<Props> = ({
  avatars,
  mainAvatarId,
  onUpload,
  onSetMain,
  onDelete,
}) => {
  const { t } = useTranslation('profilePage');
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderItems = avatars.map((a) => ({
    id: a.id,
    url: a.secureUrl,
    altText: `Avatar ${a.id}`,
    createdAt: a.createdAt,
  }));

  const currentItem = sliderItems[currentIndex];
  const isMain = currentItem?.id === mainAvatarId;

  const handleDelete = async () => {
    if (!currentItem) return;
    setIsLoading(true);
    try {
      await onDelete(currentItem.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetMain = async () => {
    if (!currentItem) return;
    setIsLoading(true);
    try {
      await onSetMain(currentItem.id);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentIndex(mainAvatarId ? avatars.findIndex((a) => a.id === mainAvatarId) : 0);
  }, [avatars, mainAvatarId]);

  const placeholder = (
    <Tooltip title={t('slider.add') || ''}>
      <IconButton onClick={onUpload} disabled={isLoading}>
        <AddPhotoAlternate fontSize="large" />
      </IconButton>
    </Tooltip>
  );

  const overlay = (
    <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
      <Stack direction="row" spacing={0.5}>
        <Tooltip title={t('slider.add') || ''}>
          <IconButton size="small" onClick={onUpload} disabled={isLoading} sx={{ color: 'white' }}>
            <AddPhotoAlternate fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('slider.delete') || ''}>
          <IconButton
            size="small"
            onClick={() => void handleDelete()}
            disabled={isLoading}
            sx={{ color: 'white' }}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('slider.setMain') || ''}>
          <span>
            <IconButton
              size="small"
              onClick={() => void handleSetMain()}
              disabled={isMain || isLoading}
              color={isMain ? 'primary' : 'default'}
              sx={{ color: isMain ? 'primary.main' : 'white' }}
            >
              <CheckCircleOutline fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      {currentItem && (
        <Typography variant="caption">
          {new Date(currentItem.createdAt).toLocaleDateString()}
        </Typography>
      )}

      <Typography variant="body2">
        {sliderItems.length ? `${currentIndex + 1} / ${sliderItems.length}` : '-'}
      </Typography>
    </Stack>
  );

  return (
    <ImageSlider
      items={sliderItems}
      currentIndex={currentIndex}
      onIndexChange={setCurrentIndex}
      overlay={overlay}
      placeholder={placeholder}
    />
  );
};
